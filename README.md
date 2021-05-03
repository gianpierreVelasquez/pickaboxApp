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
  ionic build
  ionic capacitor add android
  ionic capacitor build android

  /*Para construir app compilacion IOS*/
  ionic build
  ionic capacitor add ios
  ionic capacitor build ios

  /*To add icon and splash*/
  npm install -g cordova-res

  ###resources/
  ###├── icon.png
  ###└── splash.png

  cordova-res android --skip-config --copy
  cordova-res ios --skip-config --copy
