import {Component, OnInit} from '@angular/core';
import {RootState, enhancers} from "./redux/store/index";
import {NgReduxRouter} from "ng2-redux-router";
const createLogger = require('redux-logger');
import reducer from '../app/redux/reducers/index';
import * as moment from "moment";
import {CalendarType} from "./redux/actions/calendar-actions";
import {Router} from "@angular/router";
import {NgRedux, select} from "ng2-redux";
import {TrelloPullService} from "./services/trello-pull.service";
import {Settings} from "./models/settings";
import {Observable} from "rxjs";
import {SettingsActions} from "./redux/actions/settings-actions";
import {TrelloAuthService} from "./services/trello-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private initStore: RootState = {
    cards: [],
    boards: [],
    user: null,
    calendar: {
      type: CalendarType.Month,
      days: [],
      date: moment().locale("en")
    },
    settings: new Settings()
  };

  public languages = [
    {
      "key": "de",
      "name": "Deutsch"
    },
    {
      "key": "en",
      "name": "English"
    },
    {
      "key": "fr",
      "name": "Français"
    },
  ];

  ngOnInit() {
    this.settings$.subscribe(
      settings => {
        this.settings = settings;
        moment.locale(settings.language);
      }
    )
  }

  constructor(private ngRedux: NgRedux<RootState>,
              private ngReduxRouter: NgReduxRouter,
              public router: Router,
              private trelloPullService: TrelloPullService,
              private settingsActions: SettingsActions,
              private trelloAuthService: TrelloAuthService) {
    this.ngRedux.configureStore(
      reducer,
      this.initStore,
      [createLogger()],
      enhancers
    );
    ngReduxRouter.initialize();
    this.trelloPullService.pull();

    this.settings$.subscribe(settings => this.settings = settings);
  }

  @select(state => state.settings) public settings$: Observable<Settings>;
  public settings: Settings = new Settings();

  refresh() {
    this.trelloPullService.pull();
  }

  logout() {
    this.trelloAuthService.logout();
  }

  toggleObserverMode() {
    this.settingsActions.toggleObserverMode();
    this.trelloPullService.pull();
  }

  public updateLang(locale: string) {
    this.settingsActions.setLanguage(locale);
  }
}