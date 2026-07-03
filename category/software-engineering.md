---
layout: page
title: "Software Engineering"
permalink: /category/software-engineering/
---

System programming, development pipelines, virtualization, and engineering practices.

<ul>
  {% for post in site.categories["Software Engineering"] %}
    <li>
      <span class="cat-date">{{ post.date | date: "%b %d, %Y" }}</span> &raquo; 
      <img class="cat-image" src="{{ post.image | relative_url}}">
      <a href="{{ post.url | relative_url }}">{% if post.group %}{{ post.group }} - {% endif %}{{ post.title }}</a>
      <p>{{ post.description }}</p>
    </li>
  {% endfor %}
</ul>
