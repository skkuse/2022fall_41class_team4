import unittest
import test
import traceback
class solutionTest(unittest.TestCase):
	try:
		import test
	except Exception as error:
		print('fail:0')
		print(error)
		exit(1)

	def console_test():
		try:
			print(test.solution(2,1))
		except Exception as error:
			print(error)
		try:
			print(test.solution(24,1))
		except Exception as error:
			print(error)
if __name__ == '__main__':
	solutionTest.console_test()
