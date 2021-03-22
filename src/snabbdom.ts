
import { init } from '../node_modules/snabbdom/build/package/init'
import { classModule } from '../node_modules/snabbdom/build/package/modules/class'
import { h } from '../node_modules/snabbdom/build/package/h'
import { propsModule } from '../node_modules/snabbdom/build/package/modules/props'
import { styleModule } from '../node_modules/snabbdom/build/package/modules/style'
import { eventListenersModule } from '../node_modules/snabbdom/build/package/modules/eventlisteners'

// import { propsModule } from '../nsnabbdom/modules/props'
// import { styleModule } from 'snabbdom/modules/style'
// import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
const patch = init([ // Init patch function with chosen modules
    classModule, // makes it easy to toggle classes
    propsModule,styleModule,
    eventListenersModule
])

export { h, patch }