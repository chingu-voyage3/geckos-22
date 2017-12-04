import sys

a = 1

for x in range(0, 1000000):
	a += 0.000001

a -= 1

print a
