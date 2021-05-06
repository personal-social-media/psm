source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.1'

gem 'rails', '~> 6.1.3', '>= 6.1.3.1'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'
gem 'bcrypt', '~> 3.1.7'

gem 'bootsnap', '>= 1.4.4', require: false

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 4.1.0'
  gem 'listen', '~> 3.3'
end

### END DEFAULT RAILS

group :development do
  gem 'foreman', '~> 0.87.2'
end

gem "activeadmin", github: "activeadmin/activeadmin", ref: "6105d6bd6e021555890a57d60a8ad01404d1485b"
gem "active_material", github: "vigetlabs/active_material", ref: "e91faafcb016477637330ea593673cd521c60aa9"
gem 'turbo-rails', '~> 0.5.9'
gem 'lockbox', '~> 0.6.4'
gem 'rbnacl', '~> 7.1', '>= 7.1.1'