---
layout: page
title: "Software Engineering"
permalink: /category/software-engineering/
---

System programming, development pipelines, virtualization, and engineering practices.

<ul class="posts-list">
  {% for post in site.categories["Software Engineering"] %}
    <li>
      <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span> &raquo; 
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
