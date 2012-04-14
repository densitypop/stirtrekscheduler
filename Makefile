test:
	@./node_modules/mocha/bin/mocha \
		--ui exports \
		--reporter spec

.PHONY: test
