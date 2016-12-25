import { Component, AfterViewInit } from '@angular/core';
import { Highcharts } from 'angular2-highcharts';
import { ClosePriceService } from './../../../services/close_price/close_price.service'
import { SingletonSocket } from './../../../services/socket/socket.service'

declare var $: any;

@Component({
    selector: 'close-price',
    templateUrl: 'app/modules/realtime/close_price/close_price.component.html',
    styleUrls: ['app/public/css/realtime.css']
})

export class ClosePriceComponent implements AfterViewInit {

    store = [];
    chart: any;
    options: any;

    constructor(private _closePriceService: ClosePriceService, private _singletonSocket: SingletonSocket) {
        _singletonSocket.getDataFromSocket('restart', function(re){
            if(re.status == 'error' && re.action == 'reload'){
                location.reload();
            }
        });
    }

    ngAfterViewInit() {
        var width = $(".close-price").width();
        this.options = {
            title: { text: 'Close Price' },
            subtitle: {
                text: 'Perior: 30 minutes'
            },
            chart: {
                type: 'spline',
                width: width
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Time'
                }
            },
            yAxis: {
                title: {
                    text: 'Price'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'USD';
                    }
                }
            },
            series: [{
                name: 'BTC/USD',
                data: []
            }]
        };

        var self = this;
        this._closePriceService.closePrice().subscribe(
            data => initChart(data),
            error => console.log("Error HTTP Post Service")
        )
        var initChart = function (data) {
            self.store = data;
            for (var i = 0; i < self.store.length; i++) {
                self.chart.series[0].addPoint(self.store[i])
            }
        }
        
        this._singletonSocket.getDataFromSocket('closeprices', function(re){
            var item = [];
            item.push(re.time);
            item.push(re.data);
            reloadChart(item);
        })
        var reloadChart = function (data) {
            var series = self.chart.series[0], shift = series.data.length >= 48;
            self.chart.series[0].addPoint(data, true, shift);
            self.store.push(data);
            self.store.shift();
            return;
        }
    }

    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }
    
}










/**
 * Theme of chart. Just skip that if you dont care about artworks =))
 */

Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Unica+One',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
        '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
            ]
        },
        style: {
            fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063'
    },
    title: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
        }
    },
    subtitle: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
        }
    },
    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'

            }
        }
    },
    yAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#B0B0B3'
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },
    legend: {
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#707073'
        }
    },

    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },

    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },

    // scroll charts
    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },

    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        },
        xAxis: {
            gridLineColor: '#505053'
        }
    },

    scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    },

    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#C0C0C0',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)'
};


// Apply the theme
Highcharts.setOptions(Highcharts.theme);
Highcharts.setOptions({
    global: {
        useUTC: false
    }
})