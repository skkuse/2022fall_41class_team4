import unittest
import test
class solutionTest(unittest.TestCase):
	def test0(self):
		self.assertEqual(test.solution(2, 3),-1)
if __name__ == '__main__':
	unittest.main()
