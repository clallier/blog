---
layout: page
title: "Game Development"
permalink: /category/game-development/
---

Design and development of video games, physics engines, and interactive mechanics.

<ul>
  {% for post in site.categories["Game Development"] %}
    <li>
      <span class="cat-date">{{ post.date | date: "%b %d, %Y" }}</span> &raquo; 
      <img class="cat-image" src="{{ post.image | relative_url}}">
      <a href="{{ post.url | relative_url }}">{{ post.group }} - {{ post.title }}</a>
      <p class="cat-description">{{ post.description }}</p>
    </li>
  {% endfor %}
</ul>
