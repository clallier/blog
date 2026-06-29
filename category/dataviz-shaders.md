---
layout: page
title: "DataViz & Shaders"
permalink: /category/dataviz-shaders/
---

Visualizing datasets, algorithms, and real-time shader graphics.

<ul class="posts-list">
  {% for post in site.categories["DataViz & Shaders"] %}
    <li>
      <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span> &raquo; 
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
