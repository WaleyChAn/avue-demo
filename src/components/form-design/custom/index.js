import Test from './test.vue'
import Company from './company.vue'
import Department from './department.vue'
import Explain from './explain.vue'
import OfficialDocument from './officialDocument.vue'
import Suggestion from './suggestion.vue'
import Unit from './unit.vue'
import User from './user.vue'
import Linkage from './linkage.vue'
import { AggregationDemo, AggregationDemoHeader } from './aggregationDemo'

const components = [
  Test,
  Company,
  Department,
  Explain,
  OfficialDocument,
  Suggestion,
  Unit,
  User,
  Linkage,
  AggregationDemo,
  AggregationDemoHeader
]

const Custom = {
  install (Vue) {
    if (this.installed) return
    this.installed = true

    components.map(component => {
      Vue.component(component.name, component);
    })
  }
}

export default Custom
