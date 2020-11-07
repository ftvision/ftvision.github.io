---
title: "Shortcodes Update Logging"
date: 2020-11-05T18:12:30-04:00
---

Here is a list of **shortcodes** I've made for this blog.

## Code Tabs

#### Code

```md
{{</* tabs "test_file" */>}}

  {{</* tab "cpp" */>}}
    # cpp code here
  {{</* /tab */>}}

  {{</* tab "python" */>}}
    # python code here
  {{</* /tab */>}}

{{</* /tabs */>}}
```

#### Demo

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


## Box Highlight

#### Code

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

#### Demo

{{< box-highlight type="info">}}
This is a info box.
{{< /box-highlight>}}

{{< box-highlight type="warning" >}}
This is a warning box.
{{< /box-highlight >}}

{{< box-highlight type="success" >}}
This is a success box.
{{< /box-highlight >}}
