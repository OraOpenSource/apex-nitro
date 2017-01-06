# Publish
When you are done developing, you might want to publish your new code directly to your APEX application.

```
afeb publish <project>
```

APEX Front-End Boost uses SQLcl to make an API call that inserts your local files into the APEX tables (`wwv_flow_api.create_app_static_file`).

You can setup SQLcl by doing `afeb config <project>`.

Under "Advanced", two parameters will be required:

Name | Type | Default | Description
-- | -- | -- | --
`Path` | string | `sql` | Enter the path to SQLcl. If it's been added to PATH (environment variable), it is `sql`. Otherwise enter a full path. Example: `C:\sqlcl\sql`
`Database Connect String` | string | `user/pass@server:port/sid` | Enter your database schema information for SQLcl to log in. Format should follow `user/pass@server:port/sid`.

### Troubleshooting

**Error: command failed**: Please verify the parameters above. The CLI cannot validate them and will crash if `Path` or `Database Connect String` are invalid.

The publish feature will work given that these parameters are valid.
