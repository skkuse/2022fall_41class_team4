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

	def test0(self):
		try:
			self.assertEqual(test.solution(2,1),1)
			print(f'success:0')
			print(str(test.solution(2,1)))
		except Exception as error:
			print('fail:0')
			print(error)
	def test1(self):
		try:
			self.assertEqual(test.solution(24,1),23)
			print(f'success:1')
			print(str(test.solution(24,1)))
		except Exception as error:
			print('fail:1')
			print(error)
if __name__ == '__main__':
	unittest.main()
