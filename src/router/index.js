import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
// import Info from '@/components/info'
import ArticleDetails from '@/components/articleDetails'
import Quotation from '@/components/quotation'
import Character from '@/components/character'
import QuotationDetails from '@/components/quotationDetails';
import SearchDetails from '@/components/searchDetails'
import Info from '@/components/info'
import Serverce from '@/components/serverce'
import Ceshi from '@/components/ceshi'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Info',
      name: 'Info',
      component: Info
    },
    // {
    //   path: '/Info',
    //   // name: 'Info',
    //   component: Ceshi
    // },
    {
      path: '/ArticleDetails',
      name: 'ArticleDetails',
      component: ArticleDetails
    },
    {
      path: '/Quotation',
      name: 'Quotation',
      component: Quotation
    },
    {
      path: '/Character',
      name: 'Character',
      component: Character
    },
    {
      path: '/QuotationDetails',
      name: 'QuotationDetails',
      component: QuotationDetails
    },
    {
      path: '/SearchDetails',
      name: 'Search',
      component: SearchDetails
    },
    {
      path: '/Serverce',
      name: 'Serverce',
      component: Serverce
    },
  ]
})
