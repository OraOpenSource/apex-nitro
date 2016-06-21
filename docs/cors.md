## Cross Origin Sharing Requests

Starting from ORDS `3.0.3`, a new security rule concerning `Cross Origin Sharing Requests` conflicts with APEX Front-End Boost when using a VM through port forwarding:

> 403 Forbidden  
> The request cannot be processed because this resource does not support Cross Origin Sharing requests, or the request Origin is not authorized to access this resource. If ords is being reverse proxied ensure the front end server is propagating the host name, for mod_proxy ensure ProxyPreserveHost is set to On

This occurs when the server is using ORDS `3.0.3`, `3.0.4` or `3.0.5`.

For Apache, please follow the message and set the ProxyPreserveHost parameter to On.

Otherwise until then please use ORDS `3.0.2` or less, as the error does **NOT** occur.

Here are some related forum topics:
- https://community.oracle.com/thread/3906326
- https://community.oracle.com/message/13659147
