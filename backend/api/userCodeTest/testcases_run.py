import unittest
import test
class solutionTest(unittest.TestCase):
	def test0(self):
		try:
			self.assertEqual(test.solution(2, 3),-1)
		except AssertionError as e:
			print(f'fail:0') 
	def test1(self):
		try:
			self.assertEqual(test.solution(102, 12),10)
		except AssertionError as e:
			print(f'fail:1') 
if __name__ == '__main__':
	unittest.main()
