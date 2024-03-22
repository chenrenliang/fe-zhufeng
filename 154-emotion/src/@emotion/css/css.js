import { serializeStyles } from '../serialize';
import { insertStyles } from '../utils';
function css(...args) {
    console.log('...args', args) //0: "\n color: red;\n"
  const serialized = serializeStyles(args);
  // {name: '989aa3', styles: '\n color: red; \n'}
  insertStyles(serialized);
// css-989a3
//rule  .css-989a3{ color: red;}
//<style data-emotion="css">.css-989a3{color:red;}</style>


  return 'css' + "-" + serialized.name;
}
export default css;