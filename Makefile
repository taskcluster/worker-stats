.PHONY: test
test:
	./node_modules/.bin/mocha \
		$(wildcard *_test.js) \
		$(wildcard routes/*_test.js) \
		$(wildcard models/*_test.js);
