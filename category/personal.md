---
layout: page
title: "Personal & Academic"
permalink: /category/personal/
---

Career milestones, academic research, slides, and personal updates.

<ul>
    <li>
      <span class="post-date">01 Jun, 2026</span> &raquo; 
      <a href="{{ '/resume/' | relative_url }}">📄 Resume</a>
    </li>

    <li>
      <span class="post-date">01 Jun, 2026</span> &raquo; 
      <a href="{{ '/assets/presentations/Timeline/timeline.pdf' | relative_url }}" target="_blank">⏳ Career
              Timeline</a>
    </li>

  {% for post in site.categories["Personal"] %}
    <li>
      <span class="cat-date">{{ post.date | date: "%b %d, %Y" }}</span> &raquo; 
      <img class="cat-image" src="{{ post.image | relative_url}}">
      <a href="{{ post.url | relative_url }}">{% if post.group %}{{ post.group }} - {% endif %}{{ post.title }}</a>
      <p>{{ post.description }}</p>
    </li>
  {% endfor %}

</ul>
