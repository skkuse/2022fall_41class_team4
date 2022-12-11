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
			self.assertEqual(test.solution(11),89)
			print(f'success:0')
			print(str(test.solution(11)))
		except Exception as error:
			print('fail:0')
			print(error)
	def test1(self):
		try:
			self.assertEqual(test.solution(5),5)
			print(f'success:1')
			print(str(test.solution(5)))
		except Exception as error:
			print('fail:1')
			print(error)
	def test2(self):
		try:
			self.assertEqual(test.solution(3),2)
			print(f'success:2')
			print(str(test.solution(3)))
		except Exception as error:
			print('fail:2')
			print(error)
if __name__ == '__main__':
	unittest.main()
