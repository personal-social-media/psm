# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.1"

gem "bcrypt", "~> 3.1.7"
gem "pg", "~> 1.1"
gem "puma", "~> 5.0"
gem "rails", "~> 6.1.3", ">= 6.1.3.1"
gem "sass-rails", ">= 6"
gem "webpacker", "~> 6.0.0.beta.2"

gem "bootsnap", ">= 1.4.4", require: false

group :development, :test do
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem "guard", "~> 2.16", ">= 2.16.2"
  gem "guard-livereload", "~> 2.5", require: false
  gem "listen", "~> 3.3"
  gem "rack-livereload", "~> 0.3.17"
  gem "web-console", ">= 4.1.0"
end

### END DEFAULT RAILS

group :development do
  gem "annotate", "~> 3.1", ">= 3.1.1"
  gem "foreman", "~> 0.87.2"
  gem "rubocop-rails_config", "~> 1.5", ">= 1.5.2"
end

group :development, :test do
  gem "factory_bot_rails", "~> 6.1"
  gem "pry-rails", "~> 0.3.9"
  gem "rspec-rails", "~> 5.0", ">= 5.0.1"
end

group :test do
  gem "database_cleaner-active_record", "~> 2.0"
end

gem "activeadmin", github: "activeadmin/activeadmin", ref: "6105d6bd6e021555890a57d60a8ad01404d1485b"
gem "active_material", github: "vigetlabs/active_material", ref: "e91faafcb016477637330ea593673cd521c60aa9"
gem "lockbox", "~> 0.6.4"
gem "rbnacl", "~> 7.1", ">= 7.1.1"
gem "turbo-rails", "~> 0.5.9"
