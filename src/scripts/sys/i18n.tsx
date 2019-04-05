import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
var __lng:string = 'en';
var __callback:Function;

export function lang(){
  return __lng;
}

export async function initLanguage(lng:string){
  __lng = lng;
 await i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: [lng],
    debug: false,
    ns: ['translation'],

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection : {

    },
    //for Backend config
    backend: {
      // path where resources get loaded from, or a function
      // returning a path:
      // function(lngs, namespaces) { return customPath; }
      // the returned path will interpolate lng, ns if provided like giving a static path
      loadPath: 'locales/{{lng}}/{{ns}}.json',
    
      // path to post missing resources
      //addPath: 'locales/add/{{lng}}/{{ns}}',
    
      // your backend server supports multiloading
      // /locales/resources.json?lng=de+en&ns=ns1+ns2
      // Adapter is needed to enable MultiLoading https://github.com/i18next/i18next-multiload-backend-adapter
      // Returned JSON structure in this case is
      // {
      //  lang : {
      //   namespaceA: {},
      //   namespaceB: {},
      //   ...etc
      //  }
      // }
      //allowMultiLoading: false, // set loadPath: '/locales/resources.json?lng={{lng}}&ns={{ns}}' to adapt to multiLoading
    
      // parse data after it has been fetched
      // in example use https://www.npmjs.com/package/json5
      // here it removes the letter a from the json (bad idea)
      //parse: function(data:string) { return data.replace(/a/g, ''); },
    
      // allow cross domain requests
      crossDomain: true,
    
      // allow credentials on cross domain requests
      withCredentials: true,
      
      // overrideMimeType sets request.overrideMimeType("application/json")
      overrideMimeType: true,
      
      // custom request headers sets request.setRequestHeader(key, value)
      // customHeaders: {
      //   authorization: 'foo',
      //   // ...
      // },
    
      // define a custom xhr function
      // can be used to support XDomainRequest in IE 8 and 9
      //
      // 'url' will be passed the value of 'loadPath'
      // 'options' will be this entire options object
      // 'callback' is a function that takes two parameters, 'data' and 'xhr'.
      //            'data' should be the key:value translation pairs for the
      //            requested language and namespace, or null in case of an error.
      //            'xhr' should be a status object, e.g. { status: 200 }
      // 'data' will be a key:value object used when saving missing translations
      //ajax: function (url:any, options:any, callback:any, data:any) {},
    
      // adds parameters to resource URL. 'example.com' -> 'example.com?v=1.3.5'
      queryStringParams: { v: '1.0.0' }
    },
  });

  // if(__callback != undefined)
  //   __callback();
}
export async function changeLanguage(lng:string){
  __lng = lng;
  await i18n.changeLanguage(lng);
  if(__callback != undefined)
    __callback();
}

export function t(key:string):string{
  return i18n.t(key)
}

export function onLanguageChanged(callback:Function){
  __callback = callback;
}

export default i18n;

