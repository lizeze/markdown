
import { init } from '../node_modules/snabbdom/build/package/init'
import { classModule } from '../node_modules/snabbdom/build/package/modules/class'
import { h } from '../node_modules/snabbdom/build/package/h'


const patch = init([ // Init patch function with chosen modules
    classModule, // makes it easy to toggle classes
])

export { h, patch }