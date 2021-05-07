import "../dashboard-stylesheets/main.scss";
import "../dashboard-stylesheets/tailwind.css";
import {startTurbo} from "../lib/start-turbo";
import "../dashboard/load-all";
import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

ActiveStorage.start()
startTurbo();
Rails.start();