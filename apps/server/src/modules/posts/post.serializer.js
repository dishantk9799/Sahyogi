function toEntityId(value) {
  return value?._id ? value._id.toString() : value?.toString();
}

function toAuthorSummary(author) {
  if (!author?._id) {
    return null;
  }

  return {
    id: author._id.toString(),
    fullName: author.fullName,
    username: author.username,
    avatarUrl: author.avatarUrl,
    bio: author.bio,
  };
}

function toPublicationSummary(publication) {
  if (!publication?._id) {
    return null;
  }

  return {
    id: publication._id.toString(),
    name: publication.name,
    slug: publication.slug,
    tagline: publication.tagline,
    logoUrl: publication.logoUrl,
    accentColor: publication.accentColor,
  };
}

export function toPostDTO(post) {
  return {
    id: post._id.toString(),
    publicationId: toEntityId(post.publicationId),
    authorId: toEntityId(post.authorId),
    publication: toPublicationSummary(post.publicationId),
    author: toAuthorSummary(post.authorId),
    title: post.title,
    slug: post.slug,
    subtitle: post.subtitle,
    coverImageUrl: post.coverImageUrl,
    content: post.content,
    status: post.status,
    tags: post.tags,
    category: post.category,
    readTimeMinutes: post.readTimeMinutes,
    seo: post.seo,
    publishedAt: post.publishedAt,
    scheduledFor: post.scheduledFor,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}
