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

选择一个在`api`目录下的文件，文件中定义的`Api`开头的类型将被读取，然后生成一个模拟数据，写入到
`test/api/{basename}.json`中。

各个接口的字段的jsdoc也将被读取，用于控制生成的模拟数据，格式见
[json-schema-faker](https://github.com/json-schema-faker/json-schema-faker) 的文档

类型数据配置方法参考`test`目录中的示例。
