## Cross Origin Sharing Requests

Starting from ORDS `3.0.3`, we have seen this issue when running APEX applications with APEX Front-End Boost:

> 403 Forbidden  
> The request cannot be processed because this resource does not support Cross Origin Sharing requests, or the request Origin is not authorized to access this resource. If ords is being reverse proxied ensure the front end server is propagating the host name, for mod_proxy ensure ProxyPreserveHost is set to On

This occurs when the server is using ORDS `3.0.3`, `3.0.4` or `3.0.5`.

It does **NOT** occur when using ORDS `3.0.2` or less.

Hopefully that will be fixed in future ORDS version, until then please use ORDS `3.0.2` or less.

Here are some related forum topics:
- https://community.oracle.com/thread/3906326
- https://community.oracle.com/message/13659147
