import ramda from 'ramda'

const injectGlobalRamda = () => {
  for (functionName in ramda) {
    global[functionName] = ramda[functionName]
  }
}

export default injectGlobalRamda

