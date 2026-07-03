---
layout: page
title: "DataViz & Shaders"
permalink: /category/dataviz-shaders/
---

Visualizing datasets, algorithms, and real-time shader graphics.

<ul>
  {% for post in site.categories["DataViz & Shaders"] %}
    <li>
      <span class="cat-date">{{ post.date | date: "%b %d, %Y" }}</span> &raquo; 
      <img class="cat-image" src="{{ post.image | relative_url}}">
      <a href="{{ post.url | relative_url }}">{{ post.group }} - {{ post.title }}</a>
      <p class="cat-description">{{ post.description }}</p>
    </li>
  {% endfor %}

  <li>
  <span class="cat-date">Jul 29, 2014</span> &raquo; 
  <a href="{{ '/nature_code/' | relative_url }}">Nature + Code</a>
  </li>
</ul>
