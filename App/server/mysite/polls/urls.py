from django.conf.urls import url

from . import views

urlpatterns = [
	# GET method
    url(r'^welcome$', views.welcome, name='welcome'),
    url(r'^getcsrf$', views.getcsrf, name='getcsrf'),
    # POST method
    url(r'^predict$', views.predict, name='predict'),
]