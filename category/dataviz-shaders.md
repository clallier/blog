---
layout: page
title: "DataViz & Shaders"
permalink: /category/dataviz-shaders/
---

Visualizing datasets, algorithms, and real-time shader graphics.

<ul>
  {% for post in site.categories["Dataviz"] %}
    <li>
      <span class="cat-date">{{ post.date | date: "%b %d, %Y" }}</span> &raquo; 
      <img class="cat-image" src="{{ post.image | relative_url}}">
      <a href="{{ post.url | relative_url }}">{% if post.group %}{{ post.group }} - {% endif %}{{ post.title }}</a>
      <p>{{ post.description }}</p>
    </li>
  {% endfor %}
</ul>
