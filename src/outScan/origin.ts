/**
 * 这里做了简单的映射，但是其实最好抽离成ast语法树，通过第三方包的规则来转换生成不同框架代码, 如： https://github.com/teleporthq/teleport-code-generators
 */
import REACT_MAP from "./langs/out-react";
import VUE_MAP from "./langs/out-vue";

const LANG_MAPS = {
  react: REACT_MAP,
  vue: VUE_MAP
}

export default LANG_MAPS

