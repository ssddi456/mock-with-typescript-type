mockapi
=======

### install 

```
git clone https://github.com/ssddi456/mock-with-typescript-type.git
cd mock-with-typescript-type
npm link
```

### usage

```
mockapi
```

### description

从api接口类型定义快速生成模拟数据。

此工具以执行路径为根目录，引导用户选择一个在`api`目录下的文件，然后再选择该文件中定义的`Api`开头的类型，以此类型生成模拟数据，写入到
`test/api/{path/to/url}.json`中。

jsdoc注释可用于控制生成的模拟数据，参见
[json-schema-faker](https://github.com/json-schema-faker/json-schema-faker) 的文档

类型数据配置方法参考`test`目录中的示例。

```@url```注释可以指定输出路径，属性的注释可以指定输出格式

```typescript
/**
 * @url /path/to/visit
 */

interface ApiTestResp {
    /**
     * @pattern \*{4} [0-9]{4}
     */
    name: string;
    /**
     * @type integer
     * @minimum 0
     * @maximum 100
     * @autoIncrement true
     */
    score: number;
    /**
     * @minItems 10
     * @maxItems 10
     */
    topUsers: UserStatus[];
}
```

