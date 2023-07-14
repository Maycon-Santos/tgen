import { Hook } from '@oclif/core'
import { exitConfig } from '../utils/config'

const hook: Hook<'postrun'> = async function () {
  exitConfig()
}

export default hook
