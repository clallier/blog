---
layout: page
title: "Game Development"
permalink: /category/game-development/
---

Design and development of video games, physics engines, and interactive mechanics.

<ul class="posts-list">
  {% for post in site.categories["Game Development"] %}
    <li>
      <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span> &raquo; 
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
