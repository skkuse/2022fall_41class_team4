import unittest
import test
import traceback
class solutionTest(unittest.TestCase):
	def test0(self):
		try:
			self.assertEqual(test.solution(2, 3),-1)
			print(f'success:0')
			print(str(test.solution(2, 3)))
		except Exception as error:
			print('fail:0')
			print(error)
	def test1(self):
		try:
			self.assertEqual(test.solution(102, 12),10)
			print(f'success:1')
			print(str(test.solution(102, 12)))
		except Exception as error:
			print('fail:1')
			print(error)
if __name__ == '__main__':
	unittest.main()
