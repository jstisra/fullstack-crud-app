package com.example.backend.controllers;

import com.example.backend.models.Item;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.backend.repositories.ItemRepository;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/items")
//@CrossOrigin(origins = "http://localhost:3000")  // Allow frontend to call backend
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        if (item.getName() == null || item.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Prevent empty requests
        }
        Item savedItem = itemRepository.save(item);
        return ResponseEntity.status(201).body(savedItem);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        if (!itemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        itemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item newItem) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setName(newItem.getName());
                    return ResponseEntity.ok(itemRepository.save(item));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
