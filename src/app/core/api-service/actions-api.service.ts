import { Injectable } from '@angular/core';
import { LoadingProvider } from '../util/loading.service';
import { LoaderOptions } from './api.interface';

@Injectable()
export class ActionsApiProvider {
  public _loader;

  constructor(
      private readonly _loadingProvider: LoadingProvider
  ) { }

  public beforeRequest(options: LoaderOptions) {
    this._loader = this._loadingProvider.show(options);
  }

  public afterRequest() {
    this._loadingProvider.dismiss();
  }

//   public actionForError(httpError) {
//     const opts = {
//       ...this._optsModal,
//       title: this._getErrorTitle(httpError),
//       description: this._getErrorMsg(httpError),
//       imgs: this._getErrorIco(httpError),
//       operationCode: httpError.error.codigoOperacion
//     };
//     if (isObjEmpty(this._modal)) {
//       this._modal = this._ModalsProvider.loadModal('ModalUpsComponent', opts);
//     }
//   }

//   public _getErrorTitle(httpError) {
//     const errorTitle = {
//       default: `Error`,
//       500: `Error`,
//       900: `Error`,
//       404: `Mantenimiento`,
//       503: `Mantenimiento`
//     };

//     return errorTitle[httpError.status] || errorTitle.default;
//   }

//   public _getErrorMsg(httpError) {
//     const errorMsg = {
//       default: `Hubo un inconveniente al realizar la operación. Por favor, intenta nuevamente.`,
//       500: `Lo sentimos, ocurrió un problema interno. Por favor vuelva a intertarlo.
//       Si el incoveniente persiste, comuníquese con nostros para ayudarlo.`,
//       900: `Lo sentimos, ocurrió un problema interno. Por favor vuelva a intertarlo.
//       Si el incoveniente persiste, comuníquese con nostros para ayudarlo.`,
//       404: `Lo sentimos, por el momento nuestros sistemas se encuentran en mantenimiento. Disculpa las molestias, por favor intenta más tarde.`,
//       503: `Lo sentimos, por el momento nuestros sistemas se encuentran en mantenimiento. Disculpa las molestias, por favor intenta más tarde.`
//     };

//     return httpError.error.mensaje || errorMsg[httpError.status] || errorMsg.default;
//   }

//   public _getErrorIco(httpError) {
//     const errorMsg = {
//       default: '../../assets/svg/error2.svg',
//       500: '../../assets/svg/error2.svg',
//       404: '../../assets/svg/maintenance2.svg',
//       503: '../../assets/svg/maintenance2.svg'
//     };

//     return errorMsg[httpError.status] || errorMsg.default;
//   }
}
