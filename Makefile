deploy:
	@s3cmd sync \
		{404.html,css,images,index.html,lib,models,robots.txt,vendor} \
		s3://www.stirtrekscheduler.com
test:
	@./node_modules/mocha/bin/mocha \
		--ui exports \
		--reporter spec

.PHONY: test
