# pickaboxApp
UPC Taller de Proyectos I
   _             _
  (_) ___  _ __ (_) ___
  | |/ _ \| '_ \| |/ __|
  | | (_) | | | | | (__
  |_|\___/|_| |_|_|\___| CLI 6.13.1
  
  /* To install dependencies */
  'npm install' or 'npm i'
  
  /*Para correr en servidor web local*/
  ionic serve

  /*Para construir app compilacion ANDROID*/

  cordova platform rm android --> Para eliminar la version de android cordova
  cordova platform add android@latest --> Para instalar la version mas reciente de android de cordova
  ionic cordova build android

  /*Para construir app compilacion IOS*/

  cordova platform rm ios  --> Para eliminar la version de ios cordova
  cordova platform add ios@latest --> Para instalar la version mas reciente de ios de cordova
  ionic cordova build ios
