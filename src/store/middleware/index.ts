import combineMW from './combineMW'
import compose from './compose'

const myMiddlewares = compose(...combineMW)

export default myMiddlewares