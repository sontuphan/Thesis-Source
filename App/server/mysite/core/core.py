import numpy as np
from sklearn import svm
from sklearn.externals import joblib

clf = joblib.load('./core/nrw.pkl')

def predict_BTC(_exam):
	exam = np.multiply(_exam, 1000)
	return clf.predict(exam)[0]

def predict_proba_BTC(_exam):
	exam = np.multiply(_exam, 1000)
	if clf.predict(exam)[0] == 0:
		return clf.predict_proba(exam)[0][0]
	elif clf.predict(exam)[0] == 1:
		return clf.predict_proba(exam)[0][1]