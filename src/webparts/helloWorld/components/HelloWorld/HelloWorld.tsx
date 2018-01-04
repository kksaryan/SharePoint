import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Feedback from '../Feedback/Feedback';

import pnp from 'sp-pnp-js';


export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {

  public render(): React.ReactElement<IHelloWorldProps> {
    const categories =  pnp.sp.web.lists.getByTitle("Categories").items.get()
    .then(respnse => {
       return respnse.map(field => {
           return {
               key: field.ID,
               text: field.Title,
               selected:false,
           }
       }
       )
   })

   const subcategories = pnp.sp.web.lists.getByTitle("subCategories").items.get().then(respnse => {
    return respnse.map(field => {
        return {
            key: field.ID,
            text: field.Title,
            category: field.CategoryId,
            selected:false,
        }
    }
    )
}) 
    return (
      <div>
        {/* <Feedback /> */}
      </div>
      // <div className={ styles.helloWorld }>
      //   <div className={ styles.container }>
      //     <div className={ styles.row }>
      //       <div className={ styles.column }>
      //         <span className={ styles.title }>Welcome to SharePoint!</span>
      //         <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
      //         <p className={ styles.description }>{escape(this.props.description)}</p>
      //         <a href="https://aka.ms/spfx" className={ styles.button }>
      //           <span className={ styles.label }>Learn more</span>
      //         </a>
      //         <Test name="Krishna" type="Soni"/>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
