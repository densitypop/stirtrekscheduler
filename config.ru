require 'rack/file'
require 'rack/contrib'
require 'rack/lobster'

use Rack::Static, urls: ["/css", "/lib", "/models", "/vendor"]

allowed_urls = ["/", "/tracks", %r{/tracks/\d+}, %r{/sessions/\d+}, "/schedule", %r{/schedule/\d+}, "/favorites"]
allowed_urls.each do |url|
  use Rack::SimpleEndpoint, url do
    File.read 'index.html'
  end
end
run Rack::Lobster.new
