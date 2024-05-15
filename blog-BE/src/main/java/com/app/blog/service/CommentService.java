package com.app.blog.service;

import com.app.blog.entity.Comment;
import com.app.blog.entity.Post;
import com.app.blog.repository.CommentRepository;
import com.app.blog.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.antlr.v4.runtime.ListTokenSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;

    public Comment createComment(Long postId, String postedBy, String message) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {

            Comment comment = new Comment();
            comment.setPost(optionalPost.get());
            comment.setMessage(message);
            comment.setPostedBy(postedBy);
            comment.setCreatedAt(new Date());

            return commentRepository.save(comment);

        }
        throw new EntityNotFoundException("Post not found.");
    }

    public List<Comment> getCommentsByPostId(Long postId){
        return commentRepository.findByPostId(postId);
    }

}
