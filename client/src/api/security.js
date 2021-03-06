import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {DataLoader} from '../utility/data-loader';

@inject(Router, HttpClient, DataLoader)
export class SecurityApi {
  constructor(router, httpClient, dataLoader) {
    this.router = router;
    this.httpClient = httpClient;
    this.dataLoader = dataLoader;

    const baseUrl = location.protocol + '//' + window.location.hostname + ':3000/';
    this.httpClient.configure((config) => {
      config
          .useStandardConfiguration()
          .withBaseUrl(baseUrl)
          .withDefaults({
            credentials: 'include',
            mode: 'cors'
          });
    });
  }

  async verifyToken() {
    const response = await this.dataLoader.httpFetch({
      httpClient: this.httpClient,
      prefix: 'api/security/',
      endpoint: 'verifyToken'
    });

    return response;
  }

  async verifyTokenOrLogin() {
    try {
      const hasToken = await this.verifyToken();

      if (!hasToken) {
        this.router.navigateToRoute('login');
      }
    } catch (err) {
      console.log(err);
    }
  }
}