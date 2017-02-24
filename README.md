# Shopware Docker Grunt container

The grunt container can be used infront of an existing shopware container.
It mounts the volumes from the app container to read the themes, plugins and 
write the compiled js/css to the web/cache folder.

It integrates browsersync live-reload and proxies the shopware container.

    grunt:
      image: 1drop/shopware-grunt:1.0
      links:
        - app:my.shopware.docker # TODO: CHANGE HERE
      ports:
        - "3000:3000"
        - "3001:3001"
        - "3002:3002"
      volumes_from:
        - app
      environment: 
        - SHOP_ID=1 # Which shop should be compiled and watched (only 1 possible)
        - THEME=Responsive # Which theme should be watched by ESLint
        - VIRTUAL_PORT=3000
        - VIRTUAL_PROTO=http
        - VIRTUAL_HOST=sync.myshopware.docker # Used for jwilder/nginx reverse proxy
        - SYNC_PROXY_HOST=http://my.shopware.docker # TODO: CHANGE HERE

    app:
      image: some/shopware
      volumes:
        - /app/engine/Shopware/Plugins/
        - /app/themes/
        - /app/web/cache/

Available ENV params:

`SHOP_ID`: Specifies the ID of the shop that should be watched (see s_core_shops).  
`SYNC_PROXY_HOST`: Under which hostname is the shopware instance available to the grunt container (for browsersync)  
`THEME`: The theme that should be monitored by ESLint  

