BUILD_DIR=_build

404.html: export MODE=production
404.html: 404.html.liquid
	@./build-templates
css/main.css: sass/*.scss
	@mkdir -p css
	@sass --scss sass/main.scss css/main.css
build: clean css/main.css 404.html
	@mkdir -p $(BUILD_DIR)
	@cp -r {404.html,images,index.html,robots.txt} $(BUILD_DIR)
	@./node_modules/smoosh/bin/smoosh compress config.json
clean:
	rm -rf {$(BUILD_DIR),404.html,css}
deploy:
	s3cmd sync --delete-removed \
		_build/ s3://www.stirtrekscheduler.com
test:
	@./node_modules/mocha/bin/mocha \
		--ui exports \
		--reporter spec

.PHONY: test build clean
