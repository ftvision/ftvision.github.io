---
title: '短码更新日志'
date: 2020-11-05T18:12:30-04:00
---

这个日志主要是来记录我写的各种短码，以及这些短码怎么使用的。

## 文摘标题

#### 代码

```md
{{</* digest-item "title"="标题" "source"="#url" "description"="描述" */>}}
```

#### 演示

{{< digest-item "title"="标题" "source"="#" "description"="描述" />}}

## 代码标签

#### 代码

```md
{{</* tabs "test_file" */>}}

{{</* tab "cpp" */>}} # cpp code here
{{</* /tab */>}}

{{</* tab "python" */>}} # python code here
{{</* /tab */>}}

{{</* /tabs */>}}
```

#### 演示

{{< tabs "test_file">}}
{{< tab "cpp">}}

```cpp
int main(){
  return 0;
}
```

{{< /tab>}}

{{< tab "python">}}

```python
def main():
  return 0
```

{{< /tab>}}
{{< /tabs>}}

## 高亮块

#### 代码

```markdown
{{</* box-highlight type="info" */>}}
This is a info box.
{{</* /box-highlight */>}}

{{</* box-highlight type="warning" */>}}
This is a warning box.
{{</* /box-highlight */>}}

{{</* box-highlight type="success" */>}}
This is a success box.
{{</* /box-highlight */>}}
```

#### 演示

{{< box-highlight type="info">}}
This is a info box.
{{< /box-highlight>}}

{{< box-highlight type="warning" >}}
This is a warning box.
{{< /box-highlight >}}

{{< box-highlight type="success" >}}
This is a success box.
{{< /box-highlight >}}
