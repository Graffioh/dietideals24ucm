package com.ucm.serverdietideals24.Auth.util;

import java.util.Date;
import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
    private static final byte[] keyBytes = Decoders.BASE64
            .decode("Z29qb3JlY2V0dGlfbm9zdHJvX3VuaWNvX2Rpb190aV9hbWlhbW8=");
    private static final SecretKey sk = Keys.hmacShaKeyFor(keyBytes);
    // private static final long EXPIRATION_TIME = 864_000_000; // 10 days
    
    public static String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                // .issuedAt(new Date())
                // .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(sk)
                .compact();
    }

    public static String extractEmailViaToken(String token) {
        return Jwts.parser()
                .verifyWith(sk)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
