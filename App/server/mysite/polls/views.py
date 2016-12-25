from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

import sys
if './core' not in set(sys.path):
	sys.path.append(r'./core')
from core import *

# GET API
def welcome(request):
	if request.method == 'GET':
		re = {}
		re["status"] = "success"
		re["error"] = ""
		re["data"] = "Welcome to Bitcoin Prediction Core"
	else:
		re = {}
		re["status"] = "error"
		re["error"] = "You are not GET method."
		re["data"] = ""
	return HttpResponse(json.dumps(re), content_type="application/json")

def getcsrf(request):
	if request.method == 'GET':
		re = {}
		re["status"] = "success"
		re["error"] = ""
		re["data"] = request.COOKIES['csrftoken']
	else:
		re = {}
		re["status"] = "error"
		re["error"] = "You are not GET method."
		re["data"] = ""
	return HttpResponse(json.dumps(re), content_type="application/json")

# POST API
@csrf_exempt
def predict(request):
	if request.method == 'POST':
		# Receive data
		data = json.loads(request.body)
		data = [data['data']]
		# Process
		result = {}
		result['label'] = predict_BTC(data)
		result['probability'] = predict_proba_BTC(data)
		# Send result
		re = {}
		re["status"] = "success"
		re["error"] = ""
		re["data"] = result
	else:
		re = {}
		re["status"] = "error"
		re["error"] = "You are not POST method."
		re["data"] = ""
	return HttpResponse(json.dumps(re), content_type="application/json")